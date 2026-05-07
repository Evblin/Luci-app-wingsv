include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI support for WINGS V
LUCI_DEPENDS:=+luci-base +rpcd +rpcd-mod-uci +jsonfilter
LUCI_PKGARCH:=all

PKG_NAME:=luci-app-wingsv
PKG_VERSION:=0.1.0
PKG_RELEASE:=1

define Package/luci-app-wingsv/postinst
#!/bin/sh
ROOT="$${IPKG_INSTROOT}"
chmod 0755 "$${ROOT}/etc/init.d/wingsv" "$${ROOT}/usr/bin/wingsv" "$${ROOT}/etc/uci-defaults/90_luci-wingsv" 2>/dev/null || true
[ -n "$${ROOT}" ] || /etc/init.d/wingsv enable >/dev/null 2>&1 || true
exit 0
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
