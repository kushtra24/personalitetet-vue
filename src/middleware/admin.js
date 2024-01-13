export default function ({ store, app, redirect }) {
  if(store.loggedIn && store.user.role !== "admin") {
    return redirect('/');
  }
}
