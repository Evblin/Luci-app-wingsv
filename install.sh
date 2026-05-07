#!/bin/sh
set -eu

REPO="${REPO:-Evblin/Luci-app-wingsv}"
BRANCH="${BRANCH:-main}"
RAW_BASE="https://raw.githubusercontent.com/${REPO}/${BRANCH}"
TMP_DIR="/tmp/luci-app-wingsv-install"

need_cmd() {
	command -v "$1" >/dev/null 2>&1
}

fetch() {
	local url="$1" dest="$2"
	if need_cmd curl; then
		curl -fsSL "$url" -o "$dest"
	elif need_cmd wget; then
		wget -qO "$dest" "$url"
	else
		echo "Need curl or wget" >&2
		exit 1
	fi
}

install_file() {
	local src="$1" dest="$2" mode="${3:-0644}"
	mkdir -p "$(dirname "$dest")"
	cp "$src" "$dest"
	chmod "$mode" "$dest"
}

if [ ! -f /etc/openwrt_release ]; then
	echo "This installer must be run on OpenWrt." >&2
	exit 1
fi

echo "Installing luci-app-wingsv from ${REPO}@${BRANCH}"
rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

FILES="
htdocs/luci-static/resources/view/wingsv/overview.js
htdocs/luci-static/resources/view/wingsv/profiles.js
htdocs/luci-static/resources/view/wingsv/byedpi.js
htdocs/luci-static/resources/view/wingsv/vkturn.js
htdocs/luci-static/resources/view/wingsv/xray.js
root/etc/config/wingsv
root/etc/init.d/wingsv
root/etc/uci-defaults/90_luci-wingsv
root/usr/bin/wingsv
root/usr/share/luci/menu.d/luci-app-wingsv.json
root/usr/share/rpcd/acl.d/luci-app-wingsv.json
"

for file in $FILES; do
	mkdir -p "$TMP_DIR/$(dirname "$file")"
	fetch "${RAW_BASE}/${file}" "$TMP_DIR/$file"
done

install_file "$TMP_DIR/htdocs/luci-static/resources/view/wingsv/overview.js" "/www/luci-static/resources/view/wingsv/overview.js"
install_file "$TMP_DIR/htdocs/luci-static/resources/view/wingsv/profiles.js" "/www/luci-static/resources/view/wingsv/profiles.js"
install_file "$TMP_DIR/htdocs/luci-static/resources/view/wingsv/byedpi.js" "/www/luci-static/resources/view/wingsv/byedpi.js"
install_file "$TMP_DIR/htdocs/luci-static/resources/view/wingsv/vkturn.js" "/www/luci-static/resources/view/wingsv/vkturn.js"
install_file "$TMP_DIR/htdocs/luci-static/resources/view/wingsv/xray.js" "/www/luci-static/resources/view/wingsv/xray.js"

[ -f /etc/config/wingsv ] || install_file "$TMP_DIR/root/etc/config/wingsv" "/etc/config/wingsv"
install_file "$TMP_DIR/root/etc/init.d/wingsv" "/etc/init.d/wingsv" 0755
install_file "$TMP_DIR/root/etc/uci-defaults/90_luci-wingsv" "/etc/uci-defaults/90_luci-wingsv" 0755
install_file "$TMP_DIR/root/usr/bin/wingsv" "/usr/bin/wingsv" 0755
install_file "$TMP_DIR/root/usr/share/luci/menu.d/luci-app-wingsv.json" "/usr/share/luci/menu.d/luci-app-wingsv.json"
install_file "$TMP_DIR/root/usr/share/rpcd/acl.d/luci-app-wingsv.json" "/usr/share/rpcd/acl.d/luci-app-wingsv.json"

if need_cmd opkg; then
	opkg update || true
	opkg install luci-base rpcd rpcd-mod-uci jsonfilter || true
fi

/etc/init.d/wingsv enable >/dev/null 2>&1 || true
rm -rf /tmp/luci-* "$TMP_DIR"
/etc/init.d/rpcd restart >/dev/null 2>&1 || true
/etc/init.d/uhttpd restart >/dev/null 2>&1 || true

echo "Done. Open LuCI: http://192.168.1.1/cgi-bin/luci/admin/services/wingsv"
echo "Runtime binaries are not bundled: install xray, ciadpi/byedpi, vk-turn-proxy, wg-quick or awg-quick as needed."
