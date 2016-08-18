import { rollup as rollupx } from 'rollup';

export async function rollup({ rollup: rollupOptions, bundle: bundleOptions }) {
  return await (await rollupx(rollupOptions)).write(bundleOptions);
}
