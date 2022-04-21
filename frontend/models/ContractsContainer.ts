import { Contract } from "near-api-js";

export default interface ContractsContainer {
    nftContract?: Contract;
    marketContract?: Contract;
}