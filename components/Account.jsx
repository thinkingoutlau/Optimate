import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getCurrentUser() {
    if (!session) {
      throw new Error('User not logged in');
    }
    const user = supabase.auth.user();
    return user;
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      let { data, error, status } = await supabase
        .from('profile')
        .select(`*`)
        .eq('user_id', user.id)
        .single();
      if (error && status !== 406) {
        console.log(error);
      }
      if (data) {
        setFirstname(data.firstname);
        setLastname(data.lastname);
      }
    } catch (error) {
      console.log(error);
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const updates = {
        user_id: user.id,
        firstname,
        lastname,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profile').upsert(updates);

      if (error) {
        console.log(error);
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="firstname">Name</label>
        <input
          id="firstname"
          type="text"
          value={firstname || ''}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastname">Name</label>
        <input
          id="lastname"
          type="text"
          value={lastname || ''}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ firstname, lastname })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
