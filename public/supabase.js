const SUPABASE_URL = "https://jnudjbfcvrwibgpkprpj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_0elEvOKlR0vpAN6_rvEBNQ_Z212yvgD";

window.db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("DB:", window.db);
