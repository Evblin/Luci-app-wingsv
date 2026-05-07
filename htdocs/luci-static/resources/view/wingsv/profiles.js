'use strict';
'require view';
'require form';

return view.extend({
	render: function() {
		var m = new form.Map('wingsv', _('WINGS V Profiles'), _('Store import links and raw tunnel configs used by the selected backend.'));

		var x = m.section(form.NamedSection, 'xray', 'xray', _('Xray profile'));
		x.anonymous = true;
		var o = x.option(form.Value, 'profile_title', _('Title'));
		o.default = 'Default';
		o = x.option(form.TextValue, 'raw_link', _('VLESS / Xray link'));
		o.rows = 4;
		o.monospace = true;

		var wg = m.section(form.NamedSection, 'wireguard', 'wireguard', _('WireGuard'));
		wg.anonymous = true;
		o = wg.option(form.Flag, 'enabled', _('Enable'));
		o.default = '0';
		o = wg.option(form.TextValue, 'quick_config', _('wg-quick config'));
		o.rows = 10;
		o.monospace = true;
		o = wg.option(form.Value, 'private_key', _('Private key'));
		o.password = true;
		o = wg.option(form.Value, 'addresses', _('Addresses'));
		o.placeholder = '10.0.0.2/32, fd00::2/128';
		o = wg.option(form.Value, 'dns', _('DNS'));
		o.default = '1.1.1.1, 1.0.0.1';
		o = wg.option(form.Value, 'mtu', _('MTU'));
		o.datatype = 'uinteger';
		o.default = '1280';
		o = wg.option(form.Value, 'public_key', _('Peer public key'));
		o = wg.option(form.Value, 'preshared_key', _('Preshared key'));
		o.password = true;
		o = wg.option(form.Value, 'allowed_ips', _('Allowed IPs'));
		o.default = '0.0.0.0/0, ::/0';
		o = wg.option(form.Value, 'endpoint', _('Endpoint'));

		var awg = m.section(form.NamedSection, 'amneziawg', 'amneziawg', _('AmneziaWG'));
		awg.anonymous = true;
		o = awg.option(form.Flag, 'enabled', _('Enable'));
		o.default = '0';
		o = awg.option(form.TextValue, 'quick_config', _('awg-quick config'));
		o.rows = 12;
		o.monospace = true;

		return m.render();
	}
});
