export default function ({ store, redirect }) {
  if(store.loggedIn && store.user.role !== "admin") {
    return redirect('/');
  }
}
