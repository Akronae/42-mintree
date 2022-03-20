<script>
import Button from '@/components/Button'
import LandingPage from '@/views/LandingPage'

export default
{
    name: 'home',

    render () 
    {
        return (
            <div id='home-view'>
                <landing-page />
            </div>
        )
    },

    data () 
    {
        return {
        }
    },

    computed:
    {
    },

    async mounted ()
    {
    },

    methods:
    {
    },

    components:
    {
        Button,
        LandingPage
    }
}
</script>

<style lang='less'>
@import '~@/styles/main.less';

#home-view
{
}
</style>
