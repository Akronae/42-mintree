import VueRouter from 'vue-router'
import Blank from '@/views/Blank'
import Home from '@/views/Home'
import Game from '@/views/Game'
import Mint from '@/views/Mint'

const routes =
[
    { path: '/blank', component: Blank, name: 'Blank' },
    { path: '/', component: Home, name: 'Home' },
    { path: '/game', component: Game, name: 'Game' },
    { path: '/mint', component: Mint, name: 'Mint' },
]

const router = new VueRouter
({
    routes,
    mode: 'history'
})

export default router