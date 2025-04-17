// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useSuiClient } from "@mysten/dapp-kit";
import type { DelegatedStake } from "@mysten/sui/client";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { normalizeSuiAddress } from "@mysten/sui/utils";
type UseGetDelegatedStakesOptions = {
	address: string;
} & Omit<UseQueryOptions<DelegatedStake[]>, "queryKey" | "queryFn">;

export function useGetDelegatedStake(options: UseGetDelegatedStakesOptions) {
	const client = useSuiClient();
	const { address, ...queryOptions } = options;
	const normalizedAddress = normalizeSuiAddress(address);
	return useQuery({
		queryKey: ["delegated-stakes", normalizedAddress],
		queryFn: () => client.getStakes({ owner: normalizedAddress }),
		...queryOptions,
	});
}
