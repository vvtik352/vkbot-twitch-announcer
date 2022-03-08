const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const { DirectConnectionAdapter, EventSubListener } = require('twitch-eventsub')

const clientId = '5tvorbvpyj1s1najzxu1hwg8c9jq9w';
const clientSecret = 'c9en7pp64ke8paydxj6d8ecbytthl7';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });

const listener =  new EventSubListener(apiClient, new DirectConnectionAdapter({
	hostName: 'tikmih.ru',
	sslCert: {
		key: `-----BEGIN RSA PRIVATE KEY-----
        MIIEogIBAAKCAQEApD+3HbqstK7QE7jB2jlIpL4ygfhDxSeFTax1oq2vW4WXoOoK
        suMxtH6KHAlNzgDjjDWWQLx1w28BbBpZuYqAt8etpu08xfgR/q+uWHM3zg0/GkK/
        UQ6rU0GJGVN/ZMnRDVD2/PeCW2A83x13scAmX2GV6PBBGpTDOgl3/3fppkU1cUG2
        eVHYCmg2CLHT5a7RX8X1a9t9GoE65WibWkmj1pdI+3R2jAUnVwjPre31PqxHD8+6
        w2axfGmO6Nw9CxeWudFMUCDWLevS2BDdZJa18v/KF9J7GuZo6ohpKyTXtZ7jYXud
        A2MJUitRpC9rwCPVlUxzuhbHxZwkR506nukMlQIDAQABAoIBABcf7V0fKi+qKRuN
        uKVLyWGAccYAuTHp1YfRDyLfR0Agd++s4+K5wAbEhhdaa/zj/SWBae0lW4MvfsjE
        kPthd6voThehcRwCSC5Od8J2PlYhYVAGM79qzE5FfNL3AYmkLG2uh4eoJU9OJmPX
        V0HMZtqo9507Lj9a0H28VYu/S0MgY5R+Fii4fnII/6OKgFWOsZaMpSlW+bN8CCj+
        1z/4sK11FIsMvDFt7ew+lPaqZo+lzybOk7agNXGbE95TdcbUmqp344UOjbYxvqJT
        5sZsGQxD26oYYz9lCQKBD/5XAdzyJCWO3iAcJPvxGlFeb6Vo/j+78oV4qyrrQ9H+
        gEwGAKUCgYEA1QTrxsoHQamDBP2QBlw1iir38tJWCRCk5Bq+2aXi/qVzCB8fhHbO
        3pcYDm+PhZJUcPZnItaKzf9aSimXII8Cth/WKBg658n7J/g4MtwscpHPLQMeaH4S
        hBWI9FeRGLFv0O0+vQchbR2VmD7i7j7vjx7myGnnluqadwJHBLcYkE8CgYEAxWOp
        Lg9heN8JtmzC+Z8kPJnfP2N/p0xC1nGvmp4fqAuqUMhR+GBXWJZPODvOaEqzCeGm
        OkgHsg174DB1hdnR+KBYzstGmZwVKA5qLx2aBsZ15NuMRwAlUDBb6l6T70sZX4l9
        Y9s7jym7+hVKPhWtB4uPlZPZKicZINkRc4MJl9sCgYAcB/m+vvcVfOjwzy0UqS2i
        cOUP3v3TU41fNuXGXj3wpHTurKnJFJlEUT2pKKUKPqc99i68Nt8tHF0VRUPN1QPW
        U3oq7IVT2xBhwhgjGTYAHY/VrINj3LMzDmJnRN6jETZVl+KZnUaYxTvaPOw/zahY
        fQiBdu4yvcx1vKb7x9xDoQKBgD88woKjItMagX4UMhLOzUks8rzYH5l1cSRKn7ul
        VPb9Zb8jrj8oflM/NHoLjwESjXFo/VxGn1CHyVv1qnELa51/oXP+48tqmcyPca1O
        in4JLtP3EmXcwheCpq/bRQGwyZw17BoFrnsbH8Hq+DITt69nIsUE7Nn4VLCVWmXr
        YTNpAoGAJHzUOEXjtFCinsYArgIRvyMs2V2Lh6wS9irUXN0B8+Pi46XKRP7G+09z
        zx56md+a+5ZkS6Mo1ihUSE2kHOYaxDX0DUtlE0DDfGjfzi5gvNK9QD2LiiGg2FnG
        /W4/6qPde0frLv0nNMbpZ9ISAshw9It9sPAYXENC251F6ofyND4=
-----END RSA PRIVATE KEY-----`,
		cert: `-----BEGIN CERTIFICATE-----
        MIIDiDCCAnACCQD+nDyLcASTfTANBgkqhkiG9w0BAQsFADCBhTELMAkGA1UEBhMC
        UlUxEjAQBgNVBAMMCXRpa21paC5ydTEPMA0GA1UEBwwGTW9zY293MQ8wDQYDVQQK
        DAZ0aWttaWgxDzANBgNVBAsMBmdvdm5hYTEPMA0GA1UECAwGTW9zY293MR4wHAYJ
        KoZIhvcNAQkBFg9hZG1pbkB0aWttaWgucnUwHhcNMjIwMzA4MTU1NDIxWhcNMjMw
        MzMwMTU1NDIxWjCBhTELMAkGA1UEBhMCUlUxEjAQBgNVBAMMCXRpa21paC5ydTEP
        MA0GA1UEBwwGTW9zY293MQ8wDQYDVQQKDAZ0aWttaWgxDzANBgNVBAsMBmdvdm5h
        YTEPMA0GA1UECAwGTW9zY293MR4wHAYJKoZIhvcNAQkBFg9hZG1pbkB0aWttaWgu
        cnUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCkP7cduqy0rtATuMHa
        OUikvjKB+EPFJ4VNrHWira9bhZeg6gqy4zG0foocCU3OAOOMNZZAvHXDbwFsGlm5
        ioC3x62m7TzF+BH+r65YczfODT8aQr9RDqtTQYkZU39kydENUPb894JbYDzfHXex
        wCZfYZXo8EEalMM6CXf/d+mmRTVxQbZ5UdgKaDYIsdPlrtFfxfVr230agTrlaJta
        SaPWl0j7dHaMBSdXCM+t7fU+rEcPz7rDZrF8aY7o3D0LF5a50UxQINYt69LYEN1k
        lrXy/8oX0nsa5mjqiGkrJNe1nuNhe50DYwlSK1GkL2vAI9WVTHO6FsfFnCRHnTqe
        6QyVAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAAM9sg3GvK6lB8Ga6Q9EgUHCX1JF
        9M48Y49pNGqpaiGUKQFtAg/E4OeGOZuEC8weTeOwovqLCdzr6XaIWU7VnTjUPduu
        oMZCI2zjmlsgL1Ju0zTsbjUIE74XU64gtkwlXxxZmrAX7mu6g9cxupTht0S7Sn4f
        Ux9zUcSO2o4LTqx1qCAr0p05Ef3guBPtBKQ4FCpqUtGYl6kLg1YW5WOXROh23W75
        OGIO2khVIT3KAMLMHUgsTpvf/FmLhXmcPIMivUyAhGAqaWCQ1YlsxIgU4+eG288Y
        2QvEAiLQdsjHyW7tC2k/ROuQuMC3yjzdh/nm+g1C9EkA85Jhl6450/qppXM=
-----END CERTIFICATE-----`
	}
}), 'thisShouldBeARandomlyGeneratedFixedString');

console.log("HUI")


;(async ()=> {
    console.log("HI!!!!!!!!!!!")
    await listener.listen();
    console.log("HI2")
    const userId = '778328873';
    

    const onlineSubscription = await listener.subscribeToStreamOnlineEvents(userId, e => {
        console.log(`${e.broadcasterDisplayName} just went live!`);
    });
    
    const offlineSubscription = await listener.subscribeToStreamOfflineEvents(userId, e => {
        console.log(`${e.broadcasterDisplayName} just went offline`);
    });
})();

