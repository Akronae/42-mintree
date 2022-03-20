<script>
import WalletUtils from '@/utils/walletUtils'

export default
{
    name: 'mint',

    async created ()
    {
        this.address = await WalletUtils.getAddress()
    },

    render () 
    {
        return (
            <div id='mint-view'>
                <h1 class='title'>Welcome, {this.address}</h1>
            </div>
        )
    },

    data () 
    {
        return {
            address: ''
        }
    },

    mounted ()
    {
    },

    computed:
    {
    },

    methods:
    {
    },

    components:
    {
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#mint-view
{
    display: flex;
    justify-content: center;

    .title
    {
        font-size: 40px;
        margin-top: 100px;
    }
}
</style>
