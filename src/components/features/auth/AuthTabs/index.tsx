import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/shared/ui/Tabs';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import { useEffect } from 'react';
import GoogleAuth from '../GoogleAuth';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';

export type AuthTab = 'register' | 'login';

export type AuthTabsProps = {
  currentTab: AuthTab;
  referalCode?: string;
};

const AuthTabs = ({ currentTab, referalCode }: AuthTabsProps) => {
  const { openDialog } = useDialog();

  const handleValueChange = (value: string) => {
    if (value === 'register') {
      openDialog(DIALOG_TYPE.login, { tab: 'register' });
    } else {
      openDialog(DIALOG_TYPE.login, { tab: 'login' });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.pathname === '/register') {
        const refId = url.searchParams.get('refId');
        openDialog(DIALOG_TYPE.login, {
          tab: 'register',
          ...(refId ? { promocode: refId } : {}),
        });
      }
    }
  }, [openDialog]);

  return (
    <Tabs value={currentTab} onValueChange={handleValueChange}>
      <TabsList>
        <TabsTrigger value="register" className="md:w-40 lg:w-32">
          Register
        </TabsTrigger>
        <TabsTrigger value="login" className="md:w-40 lg:w-32">
          Login
        </TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <div className="mb-10">
          <RegisterForm referalCode={referalCode} />
        </div>
        <GoogleAuth />
      </TabsContent>
      <TabsContent value="login">
        <div className="mb-10">
          <LoginForm />
        </div>
        <GoogleAuth />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
