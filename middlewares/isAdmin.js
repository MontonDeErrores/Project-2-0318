const isAdmin = (redirectTo) => (req,res,next) => {
  if(req.user && req.user.isAdmin){
      console.log("Welcome, user IS ADMIN");
      next();
  }else{
      console.log("User detected as not admin");
      res.redirect(redirectTo)
  }
}

module.exports = isAdmin;