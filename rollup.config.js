import del from 'rollup-plugin-delete'
import typescript from 'rollup-plugin-typescript2'

const getOutput = (type, ext) => ({
    dir: `dist/${type}`,
    entryFileNames: `[name].${ext}`,
    format: type,
    sourcemap: true,
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
})

export default {
    input: 'src/index.ts',
    output: [
        getOutput('cjs', 'cjs'),
        getOutput('esm', 'mjs'),
    ],
    external: [
        'react',
        'lodash',
    ],
    cache: false,
    plugins: [
        del({
            targets: 'dist/*',
            runOnce: true,
        }),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
    ],
}
