import { http, HttpResponse } from 'msw';
import users from './data/users.json';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    console.log('MSW login request payload:', { email, password });
    console.log('Loaded users:', users);

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      console.warn('MSW login failed for:', email);
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      success: true,
      token: 'mock-jwt-token',
      user,
    });
  }),
];
