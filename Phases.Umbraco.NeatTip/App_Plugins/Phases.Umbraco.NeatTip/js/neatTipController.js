// ==========================================================================
// NeatTip Controller - Transform verbose property descriptions into tooltips
// "Neat tips, neat interface"
// Version: 1.5.1 - Next to Property Label (Similar to TextboxIcons) with Isolation
// Fixed: Improved scroll handling with viewport checks and consistent positioning
// Fixed: Properly chains with other directive decorators (e.g., TextboxIcons) to prevent conflicts
// Changed: Icon placement moved to next to label (like TextboxIcons) instead of after input field
// Added: Draggable tooltip - users can move tooltip to compare with property values
// Fixed: Flash prevention - descriptions hidden immediately on page load
// ==========================================================================

// IMMEDIATE FLASH PREVENTION - Run before Angular initializes
// This ensures descriptions are hidden as soon as possible, but only in content editing context
// SAFE: Only affects content editing pages, has fallback, and is selective
(function () {
    'use strict';

    // Check if we're in a content editing context (where NeatTip should work)
    function isContentEditingContext() {
        var url = window.location.href || window.location.hash || '';
        // Only activate in content editing pages
        return url.includes('#/content/content/edit/') ||
            (url.includes('#/content/') && !url.includes('#/content/settings/'));
    }

    // Hide descriptions immediately when script loads (only in content context)
    function hideDescriptionsImmediately() {
        // Only run in content editing context to avoid affecting other Umbraco areas
        if (!isContentEditingContext()) {
            return;
        }

        var style = document.createElement('style');
        style.id = 'neattip-flash-prevention';
        // Only hide descriptions in property contexts (not other Umbraco areas)
        style.textContent = '.umb-property .control-description, [data-element="property"] .control-description, .umb-property-editor .control-description { visibility: hidden !important; }';
        if (!document.getElementById('neattip-flash-prevention')) {
            document.head.appendChild(style);
        }

        // Also hide via JavaScript for immediate effect, but only in property contexts
        var propertyContainers = document.querySelectorAll('.umb-property, [data-element="property"]');
        for (var i = 0; i < propertyContainers.length; i++) {
            var descriptions = propertyContainers[i].querySelectorAll('.control-description');
            for (var j = 0; j < descriptions.length; j++) {
                // Only hide if not already marked to keep visible
                if (!descriptions[j].classList.contains('neattip-keep-visible') &&
                    !descriptions[j].classList.contains('neattip-processed')) {
                    descriptions[j].style.visibility = 'hidden';
                }
            }
        }
    }

    // Fallback: Show descriptions if JavaScript fails to process them after timeout
    // This ensures descriptions are never permanently hidden if something goes wrong
    var fallbackTimeout = setTimeout(function () {
        if (isContentEditingContext()) {
            var hiddenDescriptions = document.querySelectorAll('.control-description[style*="visibility: hidden"]');
            for (var i = 0; i < hiddenDescriptions.length; i++) {
                // Only show if not processed and not marked as hidden by NeatTip
                if (!hiddenDescriptions[i].classList.contains('neattip-processed') &&
                    !hiddenDescriptions[i].classList.contains('neattip-hidden')) {
                    hiddenDescriptions[i].style.visibility = 'visible';
                    hiddenDescriptions[i].classList.add('neattip-keep-visible');
                }
            }
        }
    }, 3000); // 3 second fallback

    // Run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideDescriptionsImmediately);
    } else {
        hideDescriptionsImmediately();
    }

    // Also run on DOM mutations to catch dynamically added descriptions
    // SAFE: Only observes in content context and only processes property descriptions
    if (window.MutationObserver && isContentEditingContext()) {
        var observer = new MutationObserver(function (mutations) {
            // Only process if we're still in content context
            if (!isContentEditingContext()) {
                return;
            }

            // Only process descriptions within property containers
            for (var m = 0; m < mutations.length; m++) {
                var target = mutations[m].target;
                // Check if mutation is within a property container
                var propertyContainer = target.closest && target.closest('.umb-property, [data-element="property"]');
                if (propertyContainer) {
                    var descriptions = propertyContainer.querySelectorAll('.control-description');
                    for (var i = 0; i < descriptions.length; i++) {
                        if (!descriptions[i].classList.contains('neattip-keep-visible') &&
                            !descriptions[i].classList.contains('neattip-processed') &&
                            descriptions[i].style.visibility !== 'visible') {
                            descriptions[i].style.visibility = 'hidden';
                        }
                    }
                }
            }
        });

        // Only observe if we're in content context
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Clean up fallback timeout when Angular processes descriptions
    // This is set by the main NeatTip code when it successfully processes descriptions
    window.neattipFlashPreventionCleanup = function () {
        if (fallbackTimeout) {
            clearTimeout(fallbackTimeout);
        }
    };
})();

(function () {
    'use strict';

    // Global state
    var globalTooltip = null;
    var activeIndicator = null;
    var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    var tooltipTimeout = null;
    var mutationObserver = null;
    var isTooltipToggled = false; // Track if tooltip is toggled/pinned
    var scrollHandler = null; // Store scroll handler for cleanup
    var isDragging = false; // Track if tooltip is being dragged
    var dragOffset = { x: 0, y: 0 }; // Store drag offset
    var customPosition = null; // Store custom position when dragged

    // Configuration
    var config = {
        minLength: 0,              // Minimum characters to transform description
        tooltipDelay: 200,          // Delay before showing tooltip (ms)
        tooltipMaxWidth: 320,       // Maximum tooltip width (px)
        indicatorChar: 'i',         // Character to show in indicator
        fadeSpeed: 150              // Animation speed (ms)
    };

    // Initialize global tooltip element
    function initGlobalTooltip() {
        if (globalTooltip) return;

        globalTooltip = angular.element('<div class="neattip-tooltip" role="tooltip"></div>');
        angular.element(document.body).append(globalTooltip);

        // Close tooltip when clicking outside (only if not toggled, or force close toggled tooltips)
        angular.element(document).on('click.neattip', function (e) {
            if (!angular.element(e.target).hasClass('neattip-indicator') &&
                !angular.element(e.target).closest('.neattip-tooltip').length &&
                !angular.element(e.target).closest('.neattip-wrapper').length) {
                // If clicking outside, force close even if toggled
                hideTooltip(true);
            }
        });

        // Close tooltip on ESC key
        angular.element(document).on('keydown.neattip', function (e) {
            if (e.keyCode === 27) { // ESC
                hideTooltip();
            }
        });

        // Close tooltip on scroll (force close even if toggled)
        // Use native event listeners with capture phase to catch all scroll events
        if (!scrollHandler) {
            scrollHandler = function () {
                // Check if indicator is still in viewport
                if (activeIndicator) {
                    var indicatorEl = angular.element(activeIndicator);
                    if (indicatorEl.length) {
                        var rect = indicatorEl[0].getBoundingClientRect();
                        var isVisible = rect.top >= 0 &&
                            rect.left >= 0 &&
                            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                            rect.right <= (window.innerWidth || document.documentElement.clientWidth);

                        // If indicator is not visible, force close
                        if (!isVisible) {
                            hideTooltip(true);
                            return;
                        }
                    }
                }
                // Always close on scroll for better UX
                hideTooltip(true);
            };

            // Listen to scroll on window
            window.addEventListener('scroll', scrollHandler, true);

            // Also listen to scroll on document (for scrollable containers)
            document.addEventListener('scroll', scrollHandler, true);

            // Also listen to resize (tooltip position might be invalid after resize)
            window.addEventListener('resize', scrollHandler, true);
        }
    }

    // Show tooltip
    function showTooltip(indicator, content, isClick) {
        clearTimeout(tooltipTimeout);

        // If this is a click, set toggled state immediately for consistent behavior
        if (isClick) {
            isTooltipToggled = true;
        }

        tooltipTimeout = setTimeout(function () {
            if (!globalTooltip) return;

            // Hide tooltip first to reset any previous state
            globalTooltip.removeClass('neattip-visible');
            globalTooltip.css('pointer-events', 'none');

            // Update content first (needed for accurate size calculation)
            // Add drag handle to tooltip content
            var tooltipContent = '<div class="neattip-drag-handle" title="Drag to move tooltip"><i class="icon icon-navigation"></i></div>' + content;
            globalTooltip.html(tooltipContent);

            // Force a reflow to ensure content is rendered before positioning
            // This ensures consistent positioning for both hover and click
            globalTooltip[0].offsetHeight;

            // If tooltip was previously dragged for THIS indicator, restore custom position
            // Otherwise, calculate new position
            // Store indicator reference to track which indicator's position we're using
            var indicatorId = indicator.attr('data-neattip-id');
            if (!indicatorId) {
                indicatorId = 'neattip-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
                indicator.attr('data-neattip-id', indicatorId);
            }

            // Check if we have a stored position for this specific indicator
            var storedPosition = indicator.data('neattip-position');

            if (storedPosition && isTooltipToggled && activeIndicator === indicator[0]) {
                // Restore custom position for this indicator
                globalTooltip.css({
                    top: storedPosition.top + 'px',
                    left: storedPosition.left + 'px',
                    maxWidth: config.tooltipMaxWidth + 'px'
                });
                customPosition = storedPosition;
            } else {
                // Reset custom position when showing new tooltip or different indicator
                customPosition = null;
                // Position tooltip (calculate position right before showing)
                // Use a fresh calculation to ensure consistency
                positionTooltip(indicator);
            }

            // Setup drag functionality
            setupTooltipDrag();

            // Show with fade
            globalTooltip.addClass('neattip-visible');

            // Update active indicator
            activeIndicator = indicator;

            // Add active class to indicator if toggled
            if (isTooltipToggled) {
                indicator.addClass('neattip-active');
            } else {
                indicator.removeClass('neattip-active');
            }

            // Allow pointer events for links and drag handle in tooltip
            globalTooltip.css('pointer-events', 'auto');
        }, isTouchDevice ? 0 : config.tooltipDelay);
    }

    // Hide tooltip
    function hideTooltip(force) {
        clearTimeout(tooltipTimeout);

        // Only hide if not toggled, unless forced
        if (isTooltipToggled && !force) {
            return;
        }

        if (globalTooltip) {
            globalTooltip.removeClass('neattip-visible');
            globalTooltip.css('pointer-events', 'none');
        }

        activeIndicator = null;
        isTooltipToggled = false;
        isDragging = false;

        // Remove active class from all indicators
        angular.element('.neattip-indicator').removeClass('neattip-active');
    }

    // Setup drag functionality for tooltip
    function setupTooltipDrag() {
        if (!globalTooltip) return;

        // Remove any existing drag handlers
        globalTooltip.off('mousedown.neattip-drag');
        angular.element(document).off('mousemove.neattip-drag mouseup.neattip-drag');

        var dragHandle = globalTooltip.find('.neattip-drag-handle');
        if (dragHandle.length === 0) return;

        dragHandle.on('mousedown.neattip-drag', function (e) {
            e.preventDefault();
            e.stopPropagation();

            isDragging = true;

            // Get current tooltip position
            var tooltipRect = globalTooltip[0].getBoundingClientRect();
            var startX = e.clientX;
            var startY = e.clientY;
            var startLeft = tooltipRect.left;
            var startTop = tooltipRect.top;

            // Add dragging class for visual feedback
            globalTooltip.addClass('neattip-dragging');

            // Mouse move handler
            var mouseMoveHandler = function (e) {
                if (!isDragging) return;

                e.preventDefault();

                // Calculate new position
                var deltaX = e.clientX - startX;
                var deltaY = e.clientY - startY;
                var newLeft = startLeft + deltaX;
                var newTop = startTop + deltaY;

                // Keep tooltip within viewport bounds
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var tooltipWidth = globalTooltip.outerWidth();
                var tooltipHeight = globalTooltip.outerHeight();

                // Clamp to viewport
                newLeft = Math.max(10, Math.min(newLeft, windowWidth - tooltipWidth - 10));
                newTop = Math.max(10, Math.min(newTop, windowHeight - tooltipHeight - 10));

                // Update position
                globalTooltip.css({
                    top: newTop + 'px',
                    left: newLeft + 'px'
                });

                // Store custom position
                customPosition = {
                    top: newTop,
                    left: newLeft
                };

                // Store position for this specific indicator
                if (activeIndicator) {
                    angular.element(activeIndicator).data('neattip-position', customPosition);
                }
            };

            // Mouse up handler
            var mouseUpHandler = function (e) {
                if (!isDragging) return;

                isDragging = false;
                globalTooltip.removeClass('neattip-dragging');

                // Remove event handlers
                angular.element(document).off('mousemove.neattip-drag', mouseMoveHandler);
                angular.element(document).off('mouseup.neattip-drag', mouseUpHandler);
            };

            // Attach document-level handlers
            angular.element(document).on('mousemove.neattip-drag', mouseMoveHandler);
            angular.element(document).on('mouseup.neattip-drag', mouseUpHandler);
        });
    }

    // Cleanup scroll handlers
    function cleanupScrollHandlers() {
        if (scrollHandler) {
            window.removeEventListener('scroll', scrollHandler, true);
            document.removeEventListener('scroll', scrollHandler, true);
            window.removeEventListener('resize', scrollHandler, true);
            scrollHandler = null;
        }
    }

    // Position tooltip near indicator
    function positionTooltip(indicator) {
        if (!globalTooltip || !indicator.length) return;

        // Use getBoundingClientRect for more accurate viewport-relative positioning
        // This ensures consistent positioning regardless of scroll state
        // getBoundingClientRect automatically accounts for CSS transforms
        var indicatorRect = indicator[0].getBoundingClientRect();
        var indicatorHeight = indicatorRect.height;
        var indicatorWidth = indicatorRect.width;

        var tooltipHeight = globalTooltip.outerHeight();
        var tooltipWidth = globalTooltip.outerWidth();

        var windowWidth = window.innerWidth || angular.element(window).width();
        var windowHeight = window.innerHeight || angular.element(window).height();

        // Calculate center of indicator (viewport-relative)
        var indicatorCenterX = indicatorRect.left + (indicatorWidth / 2);

        // Default: position below indicator, centered on indicator (viewport-relative)
        var top = indicatorRect.bottom + 10;
        var left = indicatorCenterX - (tooltipWidth / 2);

        // Adjust if tooltip goes off left edge
        var minLeft = 20;
        if (left < minLeft) {
            left = minLeft;
        }

        // Adjust if tooltip goes off right edge
        var maxLeft = windowWidth - tooltipWidth - 20;
        if (left > maxLeft) {
            left = maxLeft;
        }

        // If tooltip would go below viewport, position above indicator
        if (top + tooltipHeight > windowHeight - 20) {
            top = indicatorRect.top - tooltipHeight - 10;
            globalTooltip.addClass('neattip-bottom');
        } else {
            globalTooltip.removeClass('neattip-bottom');
        }

        // Ensure tooltip doesn't go above viewport
        if (top < 20) {
            top = 20;
        }

        globalTooltip.css({
            top: top + 'px',
            left: left + 'px',
            maxWidth: config.tooltipMaxWidth + 'px'
        });

        // Position arrow to point at the indicator
        // Calculate where arrow should be relative to tooltip's left edge
        var arrowLeft = indicatorCenterX - left - 6;

        // Clamp arrow position to stay within tooltip bounds
        if (arrowLeft < 15) arrowLeft = 15;
        if (arrowLeft > tooltipWidth - 25) arrowLeft = tooltipWidth - 25;

        // Apply arrow position using CSS custom property
        globalTooltip.css('--arrow-left', arrowLeft + 'px');
    }

    // Create indicator element
    function createIndicator() {
        var indicator = angular.element(
            '<span class="neattip-indicator" ' +
            'role="button" ' +
            'tabindex="0" ' +
            'aria-label="View property description">' +
            config.indicatorChar +
            '</span>'
        );

        return indicator;
    }

    // Find the label element for a description
    function findLabel(description) {
        // Try multiple approaches to find the label
        var property = description.closest('.umb-property, [data-element="property"], .control-group, .umb-el-wrap');

        if (property.length) {
            var label = property.find('label').first();
            if (label.length) return label;
        }

        // Fallback: look for label before description
        var label = description.prevAll('label').first();
        if (label.length) return label;

        return null;
    }

    // Process a description element directly
    function processDescriptionElement(description) {
        try {
            // Skip if already processed
            if (description.hasClass('neattip-processed')) {
                return;
            }

            var textContent = description.text().trim();
            var textLength = textContent.length;

            // Skip short descriptions
            if (textLength < config.minLength) {
                description.addClass('neattip-keep-visible');
                return;
            }

            // Store original HTML (preserve formatting)
            var descriptionHtml = description.html();

            // Hide the description
            description.addClass('neattip-hidden');

            // Find the label
            var label = findLabel(description);

            if (!label || !label.length) {
                description.addClass('neattip-keep-visible');
                return;
            }

            // Find the property container
            var property = description.closest('.umb-property, [data-element="property"], .control-group, .umb-el-wrap');

            if (!property.length) {
                // Fallback: use description's parent
                property = description.parent();
            }

            // Check if property already has a wrapper (avoid duplicates)
            if (property.length && property.find('.neattip-wrapper').length > 0) {
                return;
            }

            // Store and remove the title attribute to prevent native tooltip conflict
            var originalTitle = label.attr('title');
            if (originalTitle) {
                label.attr('data-original-title', originalTitle); // Store for reference
                label.removeAttr('title'); // Remove to prevent browser tooltip
            }

            // Create wrapper to isolate from label events
            var wrapper = angular.element('<span class="neattip-wrapper"></span>');
            var indicator = createIndicator();
            wrapper.append(indicator);

            // Icon placement strategy - similar to TextboxIcons but placed after label text
            // This ensures it doesn't interfere with TextboxIcons which appends to label
            var iconPlaced = false;

            // Strategy 1: Place after property label text (not append, but after)
            var propertyLabel = property.find('label[for], .umb-property-editor label, label').first();
            if (propertyLabel.length > 0 && !iconPlaced) {
                // Check if TextboxIcons icon already exists in this label
                var textboxIcon = propertyLabel.find('.mini-rollback-icon');
                if (textboxIcon.length > 0) {
                    // If TextboxIcons icon exists, place our icon after it with a small margin
                    textboxIcon.after(wrapper);
                    wrapper.css('margin-left', '6px');
                } else {
                    // Otherwise, append to label (will appear after label text)
                    propertyLabel.append(wrapper);
                    wrapper.css('margin-left', '6px');
                }
                iconPlaced = true;
            }

            // Strategy 2: Look for umb-property-editor header/label area
            if (!iconPlaced) {
                var propertyEditor = property.find('.umb-property-editor').first();
                if (!propertyEditor.length) {
                    propertyEditor = property.closest('.umb-property-editor');
                }
                var labelArea = propertyEditor.find('.umb-property-editor__label, .control-label').first();
                if (labelArea.length > 0) {
                    // Check for TextboxIcons icon
                    var hasTextboxIcon = labelArea.find('.mini-rollback-icon').length > 0;
                    if (hasTextboxIcon) {
                        labelArea.find('.mini-rollback-icon').after(wrapper);
                    } else {
                        labelArea.append(wrapper);
                    }
                    iconPlaced = true;
                }
            }

            // Strategy 3: For block list/grid - look for the property title area
            if (!iconPlaced) {
                var blockPropertyTitle = property.closest('[data-element]').find('.umb-block-list__content-title, .umb-block-grid__content-title').first();
                if (blockPropertyTitle.length > 0) {
                    // Check for TextboxIcons icon
                    var hasTextboxIcon = blockPropertyTitle.find('.mini-rollback-icon').length > 0;
                    if (hasTextboxIcon) {
                        blockPropertyTitle.find('.mini-rollback-icon').after(wrapper);
                    } else {
                        blockPropertyTitle.append(wrapper);
                    }
                    iconPlaced = true;
                }
            }

            // Strategy 4: Top-right corner of property container (fallback)
            if (!iconPlaced) {
                var propertyContainer = property.closest('.umb-property, .umb-property-editor').first();
                if (propertyContainer.length > 0) {
                    // Check if container already has absolute positioning
                    var containerPosition = propertyContainer.css('position');
                    if (containerPosition !== 'relative' && containerPosition !== 'absolute') {
                        propertyContainer.css('position', 'relative');
                    }
                    var cornerIcon = angular.element('<div style="position: absolute; top: 8px; right: 8px; z-index: 100;"></div>');
                    cornerIcon.append(wrapper);
                    propertyContainer.append(cornerIcon);
                    iconPlaced = true;
                }
            }

            // Strategy 5: Final fallback - after description (it's hidden but still in DOM)
            if (!iconPlaced) {
                description.after(wrapper);
                iconPlaced = true;
            }

            // Attach event handlers
            attachTooltipHandlers(indicator, descriptionHtml);

            // Mark as processed
            description.addClass('neattip-processed');

        } catch (error) {
            description.addClass('neattip-keep-visible');
        }
    }

    // Attach tooltip event handlers
    function attachTooltipHandlers(indicator, content) {
        // Click handler for toggle functionality (works on both mobile and desktop)
        indicator.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle tooltip: if already showing and toggled, hide it; otherwise show and toggle it
            if (activeIndicator === indicator[0] && isTooltipToggled) {
                hideTooltip(true); // Force hide when toggled off
            } else {
                showTooltip(indicator, content, true); // Pass true for click
            }
        });

        if (isTouchDevice) {
            // Mobile: Click handler above handles everything
        } else {
            // Desktop: Hover shows tooltip (unless already toggled)
            indicator.on('mouseenter', function (e) {
                e.stopPropagation(); // Prevent label tooltip
                // Only show on hover if not already toggled
                if (!isTooltipToggled || activeIndicator !== indicator[0]) {
                    showTooltip(indicator, content, false); // Pass false for hover
                    // Don't set toggled state on hover, only on click
                }
            });

            indicator.on('mouseleave', function (e) {
                e.stopPropagation(); // Prevent label tooltip
                // Only hide on mouse leave if not toggled
                if (!isTooltipToggled) {
                    setTimeout(function () {
                        if (!globalTooltip.is(':hover')) {
                            hideTooltip();
                        }
                    }, 100);
                }
            });

            // Allow hovering over tooltip
            if (globalTooltip) {
                globalTooltip.on('mouseenter', function () {
                    clearTimeout(tooltipTimeout);
                });

                globalTooltip.on('mouseleave', function () {
                    // Only hide if not toggled
                    if (!isTooltipToggled) {
                        hideTooltip();
                    }
                });
            }
        }

        // Keyboard support (Enter or Space toggles tooltip)
        indicator.on('keydown', function (e) {
            if (e.keyCode === 13 || e.keyCode === 32) { // Enter or Space
                e.preventDefault();
                e.stopPropagation();
                // Toggle tooltip
                if (activeIndicator === indicator[0] && isTooltipToggled) {
                    hideTooltip(true); // Force hide when toggled off
                } else {
                    showTooltip(indicator, content, true); // Pass true for keyboard (same as click)
                }
            }
        });
    }

    // Setup MutationObserver for dynamic content
    function setupMutationObserver(element) {
        if (mutationObserver) {
            mutationObserver.disconnect();
        }

        mutationObserver = new MutationObserver(debounce(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length > 0) {
                    // Process new description elements
                    angular.element(mutation.target).find('.control-description').each(function () {
                        var desc = angular.element(this);
                        if (!desc.hasClass('neattip-processed')) {
                            processDescriptionElement(desc);
                        }
                    });
                }
            });
        }, 150));

        // Observe content area and common dynamic containers
        var targets = element.find('.umb-editor, .umb-block-list, .umb-block-grid, [data-element]');

        targets.each(function () {
            mutationObserver.observe(this, {
                childList: true,
                subtree: true
            });
        });
    }

    // Debounce utility
    function debounce(func, wait) {
        var timeout;
        return function () {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    }

    // Check if we're in a content node
    function isInContentNode() {
        var currentUrl = window.location.href || window.location.hash;

        // Check if we're in content editing context
        if (currentUrl.includes('#/content/content/edit/')) {
            return true;
        }

        // Exclude settings, members, media
        if (currentUrl.includes('#/settings/') ||
            currentUrl.includes('#/member/') ||
            currentUrl.includes('#/media/')) {
            return false;
        }

        return false;
    }

    // Main AngularJS integration
    angular.module("umbraco").config(['$provide', function ($provide) {
        $provide.decorator("umbPropertyEditorDirective", ['$delegate', function ($delegate) {
            var directive = $delegate[0];
            var linkFn = directive.link;

            // IMPORTANT: Preserve any existing compile function from other decorators (e.g., TextboxIcons)
            // This ensures multiple decorators can coexist regardless of load order
            var existingCompile = directive.compile;
            var isCompileFunction = existingCompile && typeof existingCompile === 'function';

            directive.compile = function () {
                // If another decorator already modified compile, get its return function
                var existingLinkFunction = null;
                if (isCompileFunction) {
                    try {
                        var result = existingCompile.apply(this, arguments);
                        // Compile functions return link functions, which should be functions
                        if (result && typeof result === 'function') {
                            existingLinkFunction = result;
                        }
                    } catch (e) {
                        // Silently handle errors from other decorators
                    }
                }

                // Return our link function that chains with existing ones
                return function (scope, element) {
                    // Only activate in content nodes
                    if (!isInContentNode()) {
                        // Call existing link function from other decorators first
                        if (existingLinkFunction && typeof existingLinkFunction === 'function') {
                            existingLinkFunction.apply(this, arguments);
                        }
                        // Then call original link function
                        if (linkFn) linkFn.apply(this, arguments);
                        return;
                    }

                    // Initialize global tooltip
                    initGlobalTooltip();

                    // Process descriptions immediately to prevent flash
                    // Use requestAnimationFrame to ensure DOM is ready but process as soon as possible
                    var processDescriptions = function () {
                        try {
                            // Find all descriptions directly
                            var descriptions = angular.element(document).find('.control-description');

                            if (descriptions.length > 0) {
                                descriptions.each(function () {
                                    var desc = angular.element(this);

                                    // Skip if already processed
                                    if (desc.hasClass('neattip-processed') || desc.hasClass('neattip-keep-visible')) {
                                        return;
                                    }

                                    var textLength = desc.text().trim().length;

                                    if (textLength >= config.minLength) {
                                        processDescriptionElement(desc);
                                    } else {
                                        desc.addClass('neattip-keep-visible');
                                    }
                                });

                                // Clean up flash prevention fallback since we've successfully processed descriptions
                                if (window.neattipFlashPreventionCleanup) {
                                    window.neattipFlashPreventionCleanup();
                                }
                            }

                            // Setup observer for dynamic content
                            setupMutationObserver(element);

                        } catch (error) {
                            // Silently handle initialization errors
                        }
                    };

                    // Process immediately if DOM is ready, otherwise wait
                    if (document.readyState === 'complete' || document.readyState === 'interactive') {
                        // DOM is ready, process immediately
                        requestAnimationFrame(processDescriptions);
                    } else {
                        // Wait for DOM to be ready, but use shorter delay
                        setTimeout(function () {
                            requestAnimationFrame(processDescriptions);
                        }, 50);
                    }

                    // Cleanup on scope destroy
                    scope.$on('$destroy', function () {
                        if (mutationObserver) {
                            mutationObserver.disconnect();
                        }
                    });

                    // CRITICAL: Call existing link function from other decorators FIRST
                    // This ensures other packages (like TextboxIcons) work correctly
                    if (existingLinkFunction && typeof existingLinkFunction === 'function') {
                        existingLinkFunction.apply(this, arguments);
                    }

                    // Then call original link function
                    if (linkFn) linkFn.apply(this, arguments);
                };
            };

            return $delegate;
        }]);
    }]);

})();