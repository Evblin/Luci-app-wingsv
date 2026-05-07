# luci-app-wingsv

LuCI web interface and OpenWrt service wrapper inspired by WINGS V.

The package stores settings in `/etc/config/wingsv` and exposes:

- status and service controls
- Xray profile and DNS/proxy options
- VK TURN proxy options
- WireGuard / AmneziaWG raw config
- ByeDPI command settings

Runtime binaries are intentionally external. Install the tools you plan to use:

- `xray` for Xray profiles
- `ciadpi` or compatible ByeDPI binary for ByeDPI
- `vk-turn-proxy` for VK TURN
- `wg-quick` or `awg-quick` for WireGuard / AmneziaWG

Build from an OpenWrt tree:

```sh
cp -r luci-app-wingsv package/luci-app-wingsv
make package/luci-app-wingsv/compile V=s
```
