// Infra
import './infra/http/app';
// import "./infra/sequelize"

// Subdomains
// import "./modules/billing"
// import "./modules/notification"
// import "./modules/trading"
// import "./modules/users"
// import "./modules/vinyl"

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./infra/http/app', () => {
      console.log('------------------> hot reloading');
    });
  }
}
