import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    Panel,
    PanelHeader,
    Button,
    Group,
    Div,
    Header,
    Avatar,
    Cell,
    List,
    Snackbar,
    CellButton, Input
} from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import {
    Icon28CancelOutline, Icon28CopyOutline, Icon28DownloadOutline, Icon28InfoCircleOutline,
    Icon28ListLetterOutline,
    Icon28QrCodeOutline, Icon28SchoolOutline,
    Icon28WriteSquareOutline
} from "@vkontakte/icons";

export const Home = ({ id }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [snackbar, setSnackbar] = useState(null);

    useEffect(() => {
        bridge.send('VKWebAppInit');
        fetchUserInfo();
    }, []);


    const fetchUserInfo = async () => {
        try {
            const userData = await bridge.send('VKWebAppGetUserInfo');
            setUserInfo(userData);
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error);
        }
    };

    const openContacts = async () => {
        try {
            await bridge.send('VKWebAppOpenContacts');
        } catch (error) {
            console.error('Ошибка при открытии контактов:', error);
            showSnackbar('Ошибка при открытии контактов');
        }
    };

    const showImage = async () => {
        try {
            await bridge.send('VKWebAppShowImages', { images: [imageURL] });
            console.log('Изображение успешно открыто');
        } catch (error) {
            console.error('Ошибка при открытии изображения:', error);
            showSnackbar('Ошибка при открытии изображения');
        }
    };

    const handleImageChange = (e) => {
        setImageURL(e.target.value);
    };

    const showSnackbar = (text) => {
        setSnackbar(<Snackbar onClose={() => setSnackbar(null)}>{text}</Snackbar>);
    };

    const closeApp = async () => {
        try {
            await bridge.send('VKWebAppClose');
        } catch (error) {
            console.error('Ошибка при закрытии приложения:', error);
            showSnackbar('Ошибка при закрытии приложения');
        }
    };

    const copyText = () => {
        bridge.send('VKWebAppCopyText', { text: 'https://techno-test.vk.company/test/1883/' })
            .then(() => showSnackbar('Текст скопирован в буфер обмена'))
            .catch((error) => {
                console.error('Ошибка при копировании текста:', error);
                showSnackbar('Ошибка при копировании текста');
            });
    };

    const downloadFile = () => {
        bridge.send('VKWebAppDownloadFile', { url: 'https://xsrub.ru/resume1.pdf', filename: 'resume1.pdf' })
            .then(() => showSnackbar('Файл успешно загружен'))
            .catch((error) => {
                console.error('Ошибка при загрузке файла:', error);
                showSnackbar('Ошибка при загрузке файла');
            });
    };

    const getGeodata = async () => {
        try {
            const geodata = await bridge.send('VKWebAppGetGeodata');
            console.log('Данные о местоположении:', geodata);
            showSnackbar('Местоположение успешно получено');
        } catch (error) {
            console.error('Ошибка при получении местоположения:', error);
            showSnackbar('Ошибка при получении местоположения');
        }
    };

    const getUserInfo = async () => {
        try {
            const userData = await bridge.send('VKWebAppGetUserInfo');
            console.log('Информация о пользователе:', userData);
            showSnackbar('Информация о пользователе успешно получена');
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error);
            showSnackbar('Ошибка при получении информации о пользователе');
        }
    };


    const openCodeReader = async () => {
        try {
            await bridge.send('VKWebAppOpenCodeReader');
            console.log('QR-сканер успешно открыт');
        } catch (error) {
            console.error('Ошибка при открытии QR-сканера:', error);
            showSnackbar('Ошибка при открытии QR-сканера');
        }
    };

    const openWallPost = async () => {
        try {
            await bridge.send('VKWebAppOpenWallPost', { message: 'Привет, мир!' });
            console.log('Окно для публикации записи успешно открыто');
        } catch (error) {
            console.error('Ошибка при открытии окна для публикации записи:', error);
            showSnackbar('Ошибка при открытии окна для публикации записи');
        }
    };

    return (
        <Panel id={id}>
            <PanelHeader>Главная</PanelHeader>

            <Group header={<Header mode="secondary">Открыть картинку</Header>}>
                <Div>
                    <Input
                        id="exampleClickable"
                        type="text"
                        value={imageURL}
                        onChange={handleImageChange}
                        placeholder="Введите URL картинки"

                    />
                    <br/>
                    <Button size="l" stretched mode="secondary" onClick={showImage}>
                        Открыть картинку
                    </Button>
                </Div>
            </Group>


            <Group header={<Header mode="secondary">Дополнительные методы VK Bridge</Header>}>
                <Div>

                    <CellButton onClick={openContacts} before={<Icon28ListLetterOutline />}>
                        Показать контакты
                    </CellButton>
                    <CellButton onClick={openWallPost} before={<Icon28WriteSquareOutline />}>
                        Открыть окно для публикации записи
                    </CellButton>


                    <CellButton onClick={openCodeReader} before={<Icon28QrCodeOutline />}>
                        Открыть QR-сканер
                    </CellButton>


                    <CellButton onClick={getUserInfo} before={<Icon28InfoCircleOutline />}>
                        Получить информацию о пользователе
                    </CellButton>


                    <CellButton onClick={getGeodata} before={<Icon28SchoolOutline />}>
                        Получить местоположение
                    </CellButton>


                    <CellButton onClick={downloadFile} before={<Icon28DownloadOutline />}>
                        Скачать файл
                    </CellButton>


                    <CellButton onClick={copyText} before={<Icon28CopyOutline />}>
                        Скопировать текст
                    </CellButton>


                    <CellButton onClick={closeApp} before={<Icon28CancelOutline />}>
                        Закрыть приложение
                    </CellButton>

                </Div>
            </Group>

            <Group header={<Header mode="secondary">Информация о пользователе</Header>}>
                {userInfo && (
                    <List>
                        <Cell
                            before={userInfo.photo_200 ? <Avatar src={userInfo.photo_200} /> : null}
                            description={`ID пользователя: ${userInfo.id}`}
                        >
                            {`${userInfo.first_name} ${userInfo.last_name}`}
                        </Cell>
                    </List>
                )}
            </Group>

            {snackbar}
        </Panel>
    );
};

Home.propTypes = {
    id: PropTypes.string.isRequired,
};
