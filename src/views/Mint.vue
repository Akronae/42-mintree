<script>
import WalletUtils from '@/utils/walletUtils'
import Button from '@/components/Button'
import Game from '@/views/Game'
import ParticlesUtils from '@/utils/particlesUtils'

const SMART_CONTRACT_NETWORK = "polygon-mumbai";
const SMART_CONTRACT_ADDRESS = "0xF60A4480dC4aCcC863aA3bF5560EE9cE190874Bf";
const WALLET_IMPORTED_ON_STARTON = "0x93609906F020Ac21a5117E02Cf734E38C674a2a3";

export default
{
    name: 'mint',

    async created ()
    {
        const axios = require("axios");
        this.client = axios.create({
            baseURL: "https://api.starton.io/v2",
            headers: {
                "x-api-key": "uv2OTX2NgBJ9wffSOAaWsPAdMeK6JjYR",
            },
        });
        this.address = await WalletUtils.getAddress()
        this.mintCount = await this.getNftCount(this.address)
        this.$refs.game.refreshTrees(new Array(this.mintCount))
    },

    render () 
    {
        return (
            <div id='mint-view'>
            {
                this.mintCount
                ? <h1 class='title'>{this.address} has already minted {this.mintCount} trees!</h1>
                : <h1 class='title'>Welcome {this.address}</h1>
            }
                
                <Button text="I'm ready to mint my tree" on-click={this.mint} />
                <game trees={new Array(this.mintCount)} ref='game' />
            </div>
        )
    },

    data () 
    {
        return {
            address: '',
            client: null,
            mintCount: 0
        }
    },

    async mounted ()
    {
    },

    computed:
    {
    },

    methods:
    {
        async mint (e, button)
        {
            button.showSpinnerWhile(async () =>
            {
                const metadata = await this.uploadMetadataOnIpfs('')
                const minted = await this.mintNft(this.address, metadata.pinStatus.pin.cid)
                for (let i = 0; i < 100; i++) ParticlesUtils.createParticle({ duration: [0, 4000], delay: [0, 200] })
                for (let i = 0; i < 50; i++) ParticlesUtils.createParticle({ size: [50, 150], duration: [0, 3000], delay: [200, 600], text: ['😱', '🌳', '🌳'] })
                this.mintCount++
                this.$refs.game.refreshTrees(new Array(this.mintCount))
            })
            
        },

        async getNftCount (address)
        {
            const res = await this.client.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/read`,
            {
                functionName: "balanceOf",
                params: [address],
            });
            return parseInt(res.data.response.raw)
        },

        async mintNft(receiverAddress, metadataCid)
        {
            const nft = await this.client.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`,
            {
                functionName: "safeMint",
                signerWallet: WALLET_IMPORTED_ON_STARTON,
                speed: "low",
                params: [receiverAddress, metadataCid],
            });
            return nft.data;
        },

        async uploadMetadataOnIpfs(imgCid) {
            const metadataJson = {
                name: `Simple Tree`,
                description: `${this.address} planted a tree!`,
                //image: `ipfs://ipfs/${imgCid}`,
            };
            const ipfsMetadata = await this.client.post("/pinning/content/json",
            {
                name: "My NFT metadata Json",
                content: metadataJson,
                isSync: true,
            });
            return ipfsMetadata.data;
        },
    },

    components:
    {
        Game
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#mint-view
{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .title
    {
        font-size: 40px;
        margin-top: 50px;
    }

    .button
    {
        width: 200px;
        margin-top: 30px;
    }

    #game-view
    {
        margin-top: 30px;
    }
}
</style>
