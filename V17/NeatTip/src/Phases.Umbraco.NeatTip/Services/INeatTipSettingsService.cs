using Phases.Umbraco.NeatTip.Models;

namespace Phases.Umbraco.NeatTip.Services;

public interface INeatTipSettingsService
{
    NeatTipSettingsModel GetSettings();

    void SaveSettings(NeatTipSettingsModel settings);
}
