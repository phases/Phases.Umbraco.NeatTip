using Microsoft.Extensions.DependencyInjection;
using Phases.Umbraco.NeatTip.Configuration;
using Phases.Umbraco.NeatTip.Services;
using Phases.Umbraco.NeatTip.Services.HelperText;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Phases.Umbraco.NeatTip.Composing;

public class NeatTipComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.Configure<NeatTipSettings>(
            builder.Config.GetSection(NeatTipSettings.SectionName));

        builder.Services.AddSingleton<INeatTipSettingsService, NeatTipSettingsService>();
        builder.Services.AddSingleton<IHelperTextKeyValueRepository, HelperTextKeyValueRepository>();
        builder.Services.AddSingleton<IHelperTextResolver, HelperTextResolver>();
    }
}
