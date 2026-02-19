using System.Collections.Generic;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Manifest;

namespace Phases.Umbraco.NeatTip.Composers
{
    public class NeatTipManifestComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.ManifestFilters().Append<NeatTipManifestFilter>();
        }
       
    }

    public class NeatTipManifestFilter : IManifestFilter
    {
        public void Filter(List<PackageManifest> manifests)
        {
            manifests.Add(new PackageManifest
            {
                PackageName = "Phases.Umbraco.NeatTip",
                Scripts = new[]
                {
                    "/App_Plugins/Phases.Umbraco.NeatTip/js/neatTipController.js"
                },
                Stylesheets = new[]
                {
                    "/App_Plugins/Phases.Umbraco.NeatTip/css/style.neattip.css"
                }
            });
        }
    }
}
