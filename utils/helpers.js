module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  // helper called logged_in to check if a user is logged in
  loggedIn: (req) => {
    return req.session.loggedIn;
  },
};

// // helper called current_user to get the user's session data
// current_user: (req) => {
//   return req.session.user_id;
// },

// // helper called login to set the user's session data
// login: (req, user) => {
//   req.session.logged_in = true;
//   req.session.user_id = user.id;
// },

// // helper called logout to end a user's session
// logout: (req) => {
//   req.session.logged_in = false;
//   req.session.user_id = null;
//   },
// };
