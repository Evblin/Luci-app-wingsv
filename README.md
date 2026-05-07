# luci-app-wingsv - В разработке 

Веб-интерфейс LuCI и service wrapper для OpenWrt, вдохновленный WINGS V.

[Полная инструкция по установке на русском](INSTALL_RU.md)

## Быстрая установка на OpenWrt

```sh
sh -c "$(wget -O- https://raw.githubusercontent.com/Evblin/Luci-app-wingsv/main/install.sh)"
```

Если на прошивке нет `wget`, но есть `curl`:

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Evblin/Luci-app-wingsv/main/install.sh)"
```

После установки откройте:

```text
http://192.168.1.1/cgi-bin/luci/admin/services/wingsv
```

Меню LuCI:

```text
Services -> WINGS V
```

## Что умеет

Пакет хранит настройки в `/etc/config/wingsv` и добавляет:

- страницу статуса и кнопки управления сервисом;
- настройки Xray, DNS и локального SOCKS-прокси;
- настройки VK TURN;
- профили WireGuard и AmneziaWG;
- настройки ByeDPI;
- просмотр runtime-логов из LuCI.

Важно: пакет не содержит сами backend-бинарники. Их нужно установить отдельно под архитектуру роутера:

- `xray` для Xray;
- `ciadpi` или совместимый `byedpi` для ByeDPI;
- `vk-turn-proxy` для VK TURN;
- `wg-quick` для WireGuard;
- `awg-quick` для AmneziaWG, если нужен.

## Сборка IPK

Из OpenWrt SDK:

```sh
cd openwrt-sdk-*
git clone https://github.com/Evblin/Luci-app-wingsv.git package/luci-app-wingsv
./scripts/feeds update -a
./scripts/feeds install -a
make defconfig
make package/luci-app-wingsv/compile V=s
```

Готовый пакет появится примерно здесь:

```sh
bin/packages/*/base/luci-app-wingsv_*.ipk
```

## Релиз

В репозитории есть GitHub Actions workflow для релизов:

```text
Actions -> Release -> Run workflow
```

Укажите тег, например `v0.1.0`. Workflow создаст GitHub Release и приложит архивы исходников.

## English

LuCI web interface and OpenWrt service wrapper inspired by WINGS V.

Quick install:

```sh
sh -c "$(wget -O- https://raw.githubusercontent.com/Evblin/Luci-app-wingsv/main/install.sh)"
```

The package stores settings in `/etc/config/wingsv` and exposes:

- status and service controls;
- Xray profile and DNS/proxy options;
- VK TURN proxy options;
- WireGuard / AmneziaWG raw config;
- ByeDPI command settings.

Runtime binaries are intentionally external. Install the tools you plan to use:

- `xray` for Xray profiles;
- `ciadpi` or compatible ByeDPI binary for ByeDPI;
- `vk-turn-proxy` for VK TURN;
- `wg-quick` or `awg-quick` for WireGuard / AmneziaWG.

Build from an OpenWrt tree:

```sh
cp -r luci-app-wingsv package/luci-app-wingsv
make package/luci-app-wingsv/compile V=s
```
