# 👨‍👩‍👦‍👦 Marketplace de arte de comunidades latinas

Este proyecto tiene como eje central el comercializar arte digital proveniente de comunidades indígenas en toda américa latina, haciendo uso de los tokens NFT (Non Fungibles Tokens) de la tecnología blockchain para encapsular el valor de la historia que cada pieza pueda contar.
Actualmente existen alrededor de 522 pueblos indígenas en américa latina cada una con historia, tradiciones, cultura y arte única, misma que puede ser transmitida a todo el mundo mediante una red descentralizada creando y compartiendo contenido único y coleccionable.

De manera técnica esta dApp permite las funcionalidades de un Marketplace (Minar un NFT, Vender, Comprar, Revender, Listar tokens y quitar de la venta) tanto en un contrato construido en Solidity para Aurora EVM (Ethereum Virtual Machine) y uno en Rust para NEAR con las mismas funcionalidades. A su vez con una interfaz de usuario que nos da la opción de elegir entre NEAR o Aurora para interactuar con estos contratos del marketplace. 

 
## 📚 ¿Como esta estructurado el proyecto?

El proyecto consta de 4 partes: 
1. La construcción de un smart contract que hace posible la interacción con la blockchain. En esta ocasión utilizando la `EVM (Ethereum Virtual Machine) de NEAR llamada Aurora`, esta nos da la compatibilidad con la red de ethereum dentro del protocolo de NEAR. (`Corresponde al directorio blockchain`)
2. El desarrollo de la interfaz de usuario (frontend) amigable que permita consumir el smart contract a través de la wallet de [MetaMask]. (`Corresponde al directorio frontend`)
3. La construcción de un smart contract utilizando el lenguaje de programación Rust para la network de NEAR. Este contrato tiene la misma funcionalidad de marketplace que el contrato para la EVM Aurora. (`Dentro del directorio rust-contract en el directorio blockchain`)
4. Integrar `near-api-js` en el frontend para consumir el contrato de Rust en NEAR. (`Dentro al directorio frontend`)
 
## Documentación de cada parte del proyecto 

[Contrato en solidity para Aurora EVM]

[Contrato en Rust para NEAR]

[Frontend]

## 🎥 Avances del proyecto 

Dentro de los avances del desarrollo de este proyecto se encuentran multiples listas de reproducción que sirven como apoyo para aquellos que busquen continuar con el crecimiento de esta dApp aportando nuevas funcionalidades o siemplemente para conocer como fue el proceso de crear e implementar este proyecto utilizando NEAR y Aurora. En el canal en YouTube de [NEAR Hispano] se encuentran las diversas listas de reproducción.

Avance diario de desarrollo del proyecto:
https://www.youtube.com/watch?v=9J2xkT_tFHk&list=PLixWO0N_iFTMGU3M5KHpuMqhpdMKzw88f

Primer demo de las funcionalidades del proyecto (solo Aurora EVM):
https://www.youtube.com/watch?v=9PfxYtO0HK4&list=PLixWO0N_iFTOoCXL_rcyDowvxaO8BKAUD

Demo final de las funcionalidades del proyecto (Implementación de contrato en Rust y Aurora):
https://www.youtube.com/playlist?list=PLixWO0N_iFTNtlOFTYYVmjd_R5m4W1YV-

Comparación de rendimiento de las redes Aurora, NEAR y Ropsten:
https://www.youtube.com/playlist?list=PLixWO0N_iFTPr5LSe6s1RZfEw6yXPWV7p

[MetaMask]: https://metamask.io/
[NEAR Hispano]: https://www.youtube.com/channel/UCGJRj-rzdgow2nIAZ_pTkbQ
[Contrato en solidity para Aurora EVM]: https://github.com/cristian-cloudmex/NFT-culturas-latinas/blob/master/blockchain/README.md
[Contrato en Rust para NEAR]: https://github.com/cristian-cloudmex/NFT-culturas-latinas/blob/master/blockchain/rust-contract/README.md
[Frontend]: https://github.com/cristian-cloudmex/NFT-culturas-latinas/blob/master/frontend/README.md