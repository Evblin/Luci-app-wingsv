'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m = new form.Map('wingsv', _('Xray settings'));
		var s = m.section(form.NamedSection, 'xray', 'xray', _('Network'));
		s.anonymous = true;

		var o = s.option(form.Flag, 'enabled', _('Enable Xray'));
		o.default = '1';
		o = s.option(form.Flag, 'allow_lan', _('Allow LAN clients'));
		o.default = '0';
		o = s.option(form.Flag, 'allow_insecure', _('Allow insecure TLS'));
		o.default = '0';
		o = s.option(form.Flag, 'ipv6', _('IPv6'));
		o.default = '1';
		o = s.option(form.Flag, 'sniffing_enabled', _('Traffic sniffing'));
		o.default = '1';
		o = s.option(form.Flag, 'proxy_quic_enabled', _('Proxy QUIC'));
		o.default = '0';
		o = s.option(form.ListValue, 'transport_mode', _('Transport mode'));
		o.value('direct', _('Direct'));
		o.value('vk_turn_tcp', _('VK TURN TCP'));
		o.default = 'direct';

		s = m.section(form.NamedSection, 'xray', 'xray', _('DNS'));
		s.anonymous = true;
		o = s.option(form.Value, 'remote_dns', _('Remote DNS'));
		o.default = 'https://common.dot.dns.yandex.net/dns-query';
		o = s.option(form.Value, 'direct_dns', _('Direct DNS'));
		o.default = 'https://common.dot.dns.yandex.net/dns-query';

		s = m.section(form.NamedSection, 'xray', 'xray', _('Local SOCKS proxy'));
		s.anonymous = true;
		o = s.option(form.Flag, 'local_proxy_enabled', _('Enable local proxy'));
		o.default = '1';
		o = s.option(form.Value, 'local_proxy_port', _('Port'));
		o.datatype = 'port';
		o.default = '10808';
		o = s.option(form.Flag, 'local_proxy_auth_enabled', _('Require auth'));
		o.default = '0';
		o = s.option(form.Value, 'local_proxy_username', _('Username'));
		o.depends('local_proxy_auth_enabled', '1');
		o = s.option(form.Value, 'local_proxy_password', _('Password'));
		o.password = true;
		o.depends('local_proxy_auth_enabled', '1');

		return m.render();
	}
});
