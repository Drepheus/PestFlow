
// List of all valid zip codes for the service area (Phoenix Metro)
const VALID_ZIP_CODES = new Set([
    // Phoenix
    ...generateRange(85001, 85024),
    ...generateRange(85026, 85038),
    ...generateRange(85040, 85046),
    85048,
    ...generateRange(85050, 85051),
    ...generateRange(85053, 85054),
    ...generateRange(85060, 85064),
    ...generateRange(85066, 85072),
    85074,
    85076,
    ...generateRange(85078, 85080),
    ...generateRange(85082, 85083),
    ...generateRange(85085, 85086),

    // Tempe
    ...generateRange(85280, 85288),

    // Mesa
    ...generateRange(85201, 85210),
    ...generateRange(85212, 85216),
    ...generateRange(85274, 85277),

    // Chandler
    ...generateRange(85224, 85226),
    85244,
    85246,
    ...generateRange(85248, 85249),
    85286,

    // Gilbert
    ...generateRange(85233, 85234),
    ...generateRange(85295, 85299),

    // Scottsdale
    ...generateRange(85250, 85251),
    ...generateRange(85254, 85259),
    85260,
    85262,
    85266,
    85268,

    // Glendale
    ...generateRange(85301, 85308),
    85310,

    // Peoria
    85345,
    85373,
    ...generateRange(85381, 85383),

    // Avondale
    85323,
    85392,

    // Goodyear
    85326,
    85338,
    85395,

    // Tolleson
    85353,

    // Surprise
    85335,
    85374,
    85379,
    ...generateRange(85387, 85388),

    // Sun City / Sun City West
    85351,
    85373,
    85375,

    // Anthem / Desert Hills / New River
    85086,
    85087,

    // Cave Creek
    85331,

    // Carefree
    85377,

    // Fountain Hills
    85268,

    // Queen Creek
    85142,
]);

function generateRange(start: number, end: number): number[] {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

export function isValidZipCode(zipCode: string): boolean {
    // Remove any non-numeric characters just in case
    const cleanZip = zipCode.replace(/\D/g, '');
    const zipNum = parseInt(cleanZip, 10);

    if (isNaN(zipNum)) {
        return false;
    }

    return VALID_ZIP_CODES.has(zipNum);
}
