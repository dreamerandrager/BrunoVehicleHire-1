namespace BrunoVehicleHire.Application.Common.Validation;

public static class StringValidationHelpers
{
    public static bool IsAlphanumeric(string value)
    {
        return value.Length > 0 && value.All(char.IsLetterOrDigit);
    }

    public static bool IsWordsOfLettersAndDigits(string value)
    {
        if (string.IsNullOrEmpty(value) || value[0] == ' ' || value[^1] == ' ' || value.Contains("  "))
        {
            return false;
        }

        return value.All(c => char.IsLetterOrDigit(c) || c == ' ');
    }

    public static bool IsPersonName(string value)
    {
        if (string.IsNullOrEmpty(value) || !char.IsLetter(value[0]) || !char.IsLetter(value[^1]))
        {
            return false;
        }

        return value.All(c => char.IsLetter(c) || c is ' ' or '\'' or '-');
    }
}
