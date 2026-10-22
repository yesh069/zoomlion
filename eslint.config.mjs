import next from "eslint-config-next";

const config = [...next, { ignores: [".next/**", "out/**", "_ref/**", "next-env.d.ts"] }];

export default config;
