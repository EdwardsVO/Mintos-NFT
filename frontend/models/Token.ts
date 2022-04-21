import TokenMetadata from './TokenMetadata';

export default interface Token {
  token_id?: string;
  receiver_id?: string;
  metadata?: TokenMetadata;
  //approved accounts id
}
