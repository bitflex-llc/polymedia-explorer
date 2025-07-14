// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { configDefaults } from "vitest/config";

process.env.VITE_VERCEL_ENV = process.env.VERCEL_ENV || "development";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    test: {
        // Omit end-to-end tests:
        exclude: [...configDefaults.exclude, "tests/**"],
        css: true,
        globals: true,
        environment: "happy-dom",
    },
    build: {
        sourcemap: true,
        chunkSizeWarningLimit: 2000,
    },
    resolve: {
        alias: {
            "~": new URL("./src", import.meta.url).pathname,
        },
    },
    preview: {
        port: 3001,
    },
    server: {
        port: 3001,
        allowedHosts: ["sui.bcflex.com"],
    },
});
