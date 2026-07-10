export type TooltipRenderHost = HTMLElement;

export class TooltipHostResolver {
  resolve(indicator: HTMLElement): TooltipRenderHost {
    return this.#findOpenModalDialog(indicator) ?? document.body;
  }

  isBodyHost(host: TooltipRenderHost): boolean {
    return host === document.body;
  }

  isDialogHost(host: TooltipRenderHost): host is HTMLDialogElement {
    return host instanceof HTMLDialogElement;
  }

  #findOpenModalDialog(start: HTMLElement): HTMLDialogElement | null {
    let current: Node | null = start;

    while (current) {
      if (current instanceof HTMLDialogElement && current.open) {
        return current;
      }

      current = this.#nextAncestor(current);
    }

    return null;
  }

  #nextAncestor(node: Node): Node | null {
    if (node instanceof Element && node.assignedSlot) {
      return node.assignedSlot;
    }

    if (node.parentNode) {
      return node.parentNode;
    }

    const root = node.getRootNode();
    if (root instanceof ShadowRoot) {
      return root.host;
    }

    return null;
  }
}
