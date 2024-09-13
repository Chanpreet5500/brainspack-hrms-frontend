export function getUserRole(req) {

    const cookies = req.headers.cookie || '';
    const roleCookie = cookies.split('; ').find(row => row.startsWith('role='));
    return roleCookie ? roleCookie.split('=')[1] : 'guest';
    
  }