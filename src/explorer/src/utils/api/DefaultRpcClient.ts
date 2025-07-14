// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SuiClient, SuiHTTPTransport, getFullnodeUrl } from "@mysten/sui/client";

export enum Network {
	LOCAL = "LOCAL",
	DEVNET = "DEVNET",
	TESTNET = "TESTNET",
	MAINNET = "MAINNET",
}

export const NetworkConfigs: Record<Network, { url: string }> = {
	[Network.LOCAL]: { url: getFullnodeUrl("localnet") },
	[Network.DEVNET]: { url: getFullnodeUrl("devnet") },
	// [Network.TESTNET]: { url: "https://rpc-testnet.suiscan.xyz" },
	// [Network.MAINNET]: { url: "https://rpc-mainnet.suiscan.xyz" },
	// [Network.TESTNET]: { url: "https://testnet.suiet.app" },
	// [Network.MAINNET]: { url: "https://mainnet.suiet.app" },
	[Network.TESTNET]: { url: getFullnodeUrl("testnet") },
	[Network.MAINNET]: { url: "https://rpc-sui.bcflex.com" },
};

const defaultClientMap = new Map<Network | string, SuiClient>();

// NOTE: This class should not be used directly in React components, prefer to use the useSuiClient() hook instead
export const createSuiClient = (network: Network | string) => {
	const existingClient = defaultClientMap.get(network);
	if (existingClient) return existingClient;

	const networkUrl = network in Network ? NetworkConfigs[network as Network].url : network;

	const client = new SuiClient({
		transport: new SuiHTTPTransport({ url: networkUrl }),
	});
	defaultClientMap.set(network, client);
	return client;
};
