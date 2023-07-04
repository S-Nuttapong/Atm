import { UserConfigExport, defaultExclude, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';


export default mergeConfig(viteConfig, defineConfig({
    test: {
        exclude: [...defaultExclude, 'e2e/**/*'],
        include: ['./src/**/*.spec.*']
    },
    coverage: {
        statements: 59.79,
        thresholdAutoUpdate: true,
        include: ['src/**/*'],
        exclude: [
            'test/**',
            'vite.*.ts',
            '**/*.d.ts',
            '**/*.test.*',
            '**/*.config.*',
            '**/snapshot-tests/**',
            '**/*.solution.tsx',
            '**/coverage/**',
        ],
        //Even if it has no use; no import in this project, I'm going to report this anyway 
        all: true,
    },
    //Note: defineConfig itself has a quirky type, this type casting will be employed as the workaround, until official solution has come out    
} as UserConfigExport))