import {WagmiAdapter} from "@reown/appkit-adapter-wagmi";
import {celo, celoAlfajores, somniaTestnet} from "@reown/appkit/networks";
import {createAppKit} from "@reown/appkit/react";
import { http } from "wagmi";

export const WalletConnection = () => {
    const projectId = '62c66ed4cd07119457a08ddce0d80464';

    const wagmiAdapter = new WagmiAdapter({
        networks: [celo, somniaTestnet],
        transports: {
            [celo.id]: http('https://forno.celo.org'),
            [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org'),
        },
        projectId
    });
    
    const modal = createAppKit({
        adapters: [wagmiAdapter],
        networks: [celo, somniaTestnet],
        projectId,
        metadata: {
            name: 'Lender Dashboard',
            description: 'Dashboard para prestamistas',
            url: 'https://lender-dashboard.com',
            icons: ['https://lender-dashboard.com/icon.png']
        },
        themeMode: 'dark',
        themeVariables: {
            '--w3m-font-family': 'Inter, sans-serif',
            '--w3m-accent': '#1976d2',
        },
        features: {
            analytics: false
        }
    });
    
    return {
        wagmiAdapter,
        modal
    }
}