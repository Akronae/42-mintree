<script>
import DialogUtils from '@/utils/dialogUtils'
import Button from '@/components/Button'

export default
{
    name: 'landing-page',

    render () 
    {
        return (
            <div id='landing-page-view'>
                <div id='header'>
                    <img src={require('@/assets/img/landing-banner.jpeg')} id='banner' />
                    <div id='text'>
                        <h1 id='title'>Mintree</h1>
                        <h2 id='subtitle'>Mint a tree, act for the planet</h2>
                        <Button text='Mint me a tree!' size='large' on-click={this.mintTreeClicked} />
                    </div>
                </div>
            </div>
        )
    },

    data () 
    {
        return {
        }
    },

    mounted ()
    {
    },

    methods:
    {
        async mintTreeClicked ()
        {
            if (!window.ethereum)
            {
                return DialogUtils.showDialog({title: 'Mint a tree', description: 'You need to install MetaMask in order to mint a tree.'})
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log('Logged with account', account)
            this.$router.push('/mint')
        }
    },

    components:
    {
        Button
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#landing-page-view
{
    #header
    {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        #banner
        {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
        }

        #text
        {
            top: 200px;
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;

            #title, #subtitle
            {
                text-shadow: 6px 3px 13px black;
            }

            #title
            {
                font-size: 120px;
                color: white
            }
            #subtitle
            {
                font-size: 40px;
                color: #e3e3e3;
            }

            .button
            {
                margin-top: 130px;
            }
        }
    }
}
</style>
