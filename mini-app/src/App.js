import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const [fetchedUser, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        setPopout(null); // Установить popout в null после успешного получения данных пользователя
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        setPopout(<ScreenSpinner size="large" />);
      }
    }
    fetchData();
  }, []);

  return (
      <SplitLayout popout={null}>
        <SplitCol>
          <View activePanel={DEFAULT_VIEW_PANELS.HOME}>
            <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
          </View>
        </SplitCol>
      </SplitLayout>
  );
};
