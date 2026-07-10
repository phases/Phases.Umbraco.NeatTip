namespace Phases.Umbraco.NeatTip.Services.HelperText;

public interface IHelperTextKeyValueRepository
{
    IReadOnlyDictionary<string, string> GetCultureMap(Guid contentTypeKey, Guid propertyTypeKey);

    void SaveCultureMap(Guid contentTypeKey, Guid propertyTypeKey, IReadOnlyDictionary<string, string> cultureMap);

    bool IsMigrationComplete(Guid contentTypeKey, Guid propertyTypeKey);

    void MarkMigrationComplete(Guid contentTypeKey, Guid propertyTypeKey);
}
