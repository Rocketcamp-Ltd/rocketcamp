import { useActionState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Toaster } from '@/app/components/ui/sonner';
import { supabase } from '@/lib/supabase';

type FormState = {
  success?: boolean;
  message?: string;
} | null;

async function submitForm(prevState: FormState, formData: FormData) {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return {
        success: false,
        error: 'Пожалуйста, введите корректный email',
      };
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return {
        success: false,
        error: 'Пароль должен содержать минимум 6 символов', 
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Ошибка регистрации:', error);

      if (error.message.includes('email already registered')) {
        return {
          success: false,
          error: 'Этот email уже зарегистрирован',
        };
      }

      return {
        success: false,
        error: `Ошибка регистрации: ${error.message}`,
      };
    }

    if (data?.user) {
      return {
        success: true,
        message: 'Регистрация прошла успешно! Проверьте вашу почту для подтверждения.',
      };
    }

    return {
      success: false,
      error: 'Не удалось создать пользователя. Попробуйте позже.',
    };
  } catch (error) {
    console.error('Неожиданная ошибка:', error);
    return {
      success: false,
      error: 'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже.',
    };
  }
}

export default function UserForm() {
  const [_, formAction, isPending] = useActionState(submitForm, null);

  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Toaster
        position="top-right"
        richColors
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Регистрация пользователя</CardTitle>
          <CardDescription>Введите данные для создания аккаунта</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Введите ваш email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Создайте пароль"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Отправка...' : 'Зарегистрироваться'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
