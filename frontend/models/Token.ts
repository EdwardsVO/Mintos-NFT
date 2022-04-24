import TokenMetadata from './TokenMetadata';

export default interface Token {
  token_id?: string;
  owner_id?: string;
  metadata?: TokenMetadata;
  approved_accounts_id?: string;
  royalties?: JSON;
}
