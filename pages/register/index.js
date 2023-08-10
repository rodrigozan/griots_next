import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        router.push('/choice');
    };

    return (
        <main style={{ height: '100vh', width: '100%' }} className="flex align-items-center justify-content-center">
            <form className="flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round" style={{ height: '500px', width: '600px' }}>
                    <div className="text-center mb-5">
                        <img src="https://blocks.primereact.org/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
                        <div className="text-900 text-3xl font-medium mb-3">Register</div>
                        <span className="text-600 font-medium line-height-3">Have a account?</span>
                        <Link className="font-medium no-underline ml-2 text-primary-500 cursor-pointer" href="/login">Go to login</Link>.
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full mb-3" />

                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-3" />

                        <Button onClick={handleRegister} label="Sign Up" icon="pi pi-user" className="w-full" />
                    </div>
                </div>
            </form>
        </main>
    );
}
