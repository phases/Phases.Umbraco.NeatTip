namespace Phases.Umbraco.NeatTip.Services.HelperText;

internal static class HelperTextStorageKeys
{
    internal const string PackageNamespace = "Phases.Umbraco.NeatTip";

    internal const string InvariantCultureKey = "__invariant__";

    internal static string HelperText(Guid contentTypeKey, Guid propertyTypeKey)
        => $"{PackageNamespace}::HelperText::{contentTypeKey:N}::{propertyTypeKey:N}";

    internal static string MigrationComplete(Guid contentTypeKey, Guid propertyTypeKey)
        => $"{PackageNamespace}::HelperTextMigration::{contentTypeKey:N}::{propertyTypeKey:N}";
}
