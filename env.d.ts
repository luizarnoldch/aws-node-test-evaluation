declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SWAPI_BASE_URL?: string
            TEST_PEOPLE_TABLE?: string
            PEOPLE_TABLE?: string
            PORT?: string
        }
    }
}

export {}