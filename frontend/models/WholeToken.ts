import Sale from './Sale';
import Token from './Token';

export default interface WholeToken {
  sale?: Sale;
  token: Token;
}
