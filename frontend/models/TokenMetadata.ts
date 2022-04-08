export default interface TokenMetada {
   title?: string, // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
   description?: string, // free-form description
   media?: string, // URL to associated media, preferably to decentralized, content-addressed storage
   media_hash?: string, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
   copies?: number, //u64 // number of copies of this set of metadata in existence when token was minted.
   issued_at?: string, // ISO 8601 datetime when token was issued or minted
   price?: string, // is the price in yoctos
   creator?: string, // is the creator
   on_sale?: boolean, // sale status
   expires_at?: string, // ISO 8601 datetime when token expires
   starts_at?: string, // ISO 8601 datetime when token starts being valid
   updated_at?: string, // ISO 8601 datetime when token was last updated
   extra?: string, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
   reference?: string, // URL to an off-chain JSON file with more info.
   reference_hash?: string, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}