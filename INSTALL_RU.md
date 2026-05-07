# Установка luci-app-wingsv на OpenWrt

`luci-app-wingsv` добавляет веб-интерфейс LuCI для управления WINGS V-подобной связкой: Xray, VK TURN, WireGuard, AmneziaWG и ByeDPI.

Важно: пакет содержит веб-интерфейс, UCI-конфиг и service wrapper. Сами runtime-бинарники нужно установить отдельно под архитектуру вашего роутера:

- `xray` для Xray
- `ciadpi` или совместимый `byedpi` для ByeDPI
- `vk-turn-proxy` для VK TURN
- `wg-quick` для WireGuard
- `awg-quick` для AmneziaWG, если он нужен

## Вариант 1. Сборка IPK через OpenWrt SDK

Этот способ правильный для постоянной установки.

1. Скачайте OpenWrt SDK под вашу модель/архитектуру роутера с официального сайта OpenWrt.

2. Внутри SDK выполните:

```sh
cd openwrt-sdk-*
git clone https://github.com/Evblin/Luci-app-wingsv.git package/luci-app-wingsv
./scripts/feeds update -a
./scripts/feeds install -a
make defconfig
make package/luci-app-wingsv/compile V=s
```

3. Готовый пакет появится примерно здесь:

```sh
bin/packages/*/base/luci-app-wingsv_*.ipk
```

4. Загрузите `.ipk` на роутер:

```sh
scp bin/packages/*/base/luci-app-wingsv_*.ipk root@192.168.1.1:/tmp/
```

5. Установите пакет на роутере:

```sh
ssh root@192.168.1.1
opkg update
opkg install /tmp/luci-app-wingsv_*.ipk
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
```

6. Откройте LuCI:

```text
http://192.168.1.1
```

Меню появится в разделе:

```text
Services -> WINGS V
```

## Вариант 2. Установка через LuCI

Если у вас уже есть собранный `.ipk`:

1. Откройте веб-интерфейс роутера.
2. Перейдите в `System -> Software`.
3. Нажмите `Upload Package`.
4. Выберите файл `luci-app-wingsv_*.ipk`.
5. Установите пакет.
6. Перезапустите веб-интерфейс или выполните по SSH:

```sh
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
```

## Вариант 3. Ручная загрузка без сборки IPK

Этот способ удобен для теста, но хуже для постоянного использования.

1. Скачайте репозиторий:

```sh
git clone https://github.com/Evblin/Luci-app-wingsv.git
cd Luci-app-wingsv
```

2. Скопируйте файлы на роутер:

```sh
scp -r htdocs root@192.168.1.1:/www/
scp -r root/* root@192.168.1.1:/
```

3. На роутере выставьте права и перезапустите службы:

```sh
ssh root@192.168.1.1
chmod +x /etc/init.d/wingsv /usr/bin/wingsv /etc/uci-defaults/90_luci-wingsv
/etc/init.d/wingsv enable
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
```

4. Откройте:

```text
http://192.168.1.1/cgi-bin/luci/admin/services/wingsv
```

## Быстрая настройка

1. В LuCI откройте `Services -> WINGS V`.
2. Включите `Enable service`.
3. Выберите `Active backend`: `xray`, `vkturn`, `wireguard`, `amneziawg` или `byedpi`.
4. Заполните профиль на вкладке `Profiles`.
5. Настройте нужный backend на вкладках `Xray`, `VK TURN` или `ByeDPI`.
6. Нажмите `Save & Apply`.
7. На странице `Overview` нажмите `Start`.

Логи отображаются на странице `Overview`.

## Команды управления

```sh
/etc/init.d/wingsv start
/etc/init.d/wingsv stop
/etc/init.d/wingsv restart
/usr/bin/wingsv status
/usr/bin/wingsv log 120
```

## Где лежат настройки

Основной конфиг:

```sh
/etc/config/wingsv
```

Временные файлы runtime:

```sh
/tmp/wingsv.status
/tmp/wingsv.log
/tmp/wingsv-xray.json
/tmp/wingsv-wg.conf
/tmp/wingsv-awg.conf
```

## Если меню не появилось

Выполните:

```sh
rm -rf /tmp/luci-*
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
```

Потом обновите страницу LuCI в браузере.
