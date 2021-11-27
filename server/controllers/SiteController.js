
class SiteController {
    
    register(req, res) {
        res.render('register')
    }

    login(req, res) {
        res.render('login')
    }

    resetPassword(req, res) {
        res.render('forgot-password')
    }

    logout(req, res) {
        res.clearCookie('token')
        res.redirect('/')
    }

    home(req, res) {
        res.render('home')
    }

}

export default new SiteController