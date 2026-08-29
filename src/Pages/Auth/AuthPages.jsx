import { useNavigate } from 'react-router-dom'
import { Form, FormFieldSet, Checkbox, OtpField, Button, Avatar } from 'oks-ui'
import AuthSplit, { AuthLink } from './AuthSplit'
import { avatarUrl } from '../../lib/format'

// lucide dropped brand glyphs in some builds — guard them
const Social = () => (
  <div className="grid grid-cols-2 gap-3">
    <Button variant="bordered" color="default" fullWidth startContent={<span className="text-[13px] font-bold">G</span>}>
      Google
    </Button>
    <Button variant="bordered" color="default" fullWidth startContent={<span className="text-[13px] font-bold">GH</span>}>
      GitHub
    </Button>
  </div>
)

export function SignIn() {
  const nav = useNavigate()
  return (
    <AuthSplit
      heading="Great to see you here"
      sub="You're one step away — sign in to continue."
      footer={<>New here? <AuthLink to="/auth/sign-up">Create an account</AuthLink></>}
    >
      <Social />
      <div className="my-5 flex items-center gap-3 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
        <span className="h-px flex-1" style={{ background: 'var(--app-border)' }} />
        Continue with email
        <span className="h-px flex-1" style={{ background: 'var(--app-border)' }} />
      </div>
      <Form onSubmit={() => nav('/dashboards/ecommerce')} className="space-y-4">
        <FormFieldSet type="email" name="email" label="Email address" placeholder="you@example.com" validation={{ rules: { required: true, email: true } }} />
        <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true } }} />
        <div className="flex items-center justify-between">
          <Checkbox defaultSelected label="Keep me signed in" />
          <AuthLink to="/auth/reset-password">Forgot password?</AuthLink>
        </div>
        <Button type="submit" color="primary" fullWidth>
          Sign In
        </Button>
      </Form>
    </AuthSplit>
  )
}

export function SignUp() {
  const nav = useNavigate()
  return (
    <AuthSplit
      heading="Create your account"
      sub="Start building with oks-ui in under a minute."
      footer={<>Already registered? <AuthLink to="/auth/sign-in">Sign in</AuthLink></>}
    >
      <Social />
      <div className="my-5 flex items-center gap-3 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
        <span className="h-px flex-1" style={{ background: 'var(--app-border)' }} />
        Or with email
        <span className="h-px flex-1" style={{ background: 'var(--app-border)' }} />
      </div>
      <Form onSubmit={() => nav('/auth/success')} className="space-y-4">
        <FormFieldSet type="text" name="name" label="Full name" placeholder="Jane Cooper" validation={{ rules: { required: true } }} />
        <FormFieldSet type="email" name="email" label="Email address" placeholder="you@example.com" validation={{ rules: { required: true, email: true } }} />
        <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true, minLength: 8 } }} />
        <Checkbox label="I agree to the Terms & Privacy Policy" />
        <Button type="submit" color="primary" fullWidth>
          Create account
        </Button>
      </Form>
    </AuthSplit>
  )
}

export function ResetPassword() {
  const nav = useNavigate()
  return (
    <AuthSplit
      heading="Reset your password"
      sub="Enter your email and we'll send a reset link."
      footer={<>Remembered it? <AuthLink to="/auth/sign-in">Back to sign in</AuthLink></>}
    >
      <Form onSubmit={() => nav('/auth/success')} className="space-y-4">
        <FormFieldSet type="email" name="email" label="Email address" placeholder="you@example.com" validation={{ rules: { required: true, email: true } }} />
        <Button type="submit" color="primary" fullWidth>
          Send reset link
        </Button>
      </Form>
    </AuthSplit>
  )
}

export function NewPassword() {
  const nav = useNavigate()
  return (
    <AuthSplit heading="Set a new password" sub="Choose a strong password you haven't used before.">
      <Form onSubmit={() => nav('/auth/sign-in')} className="space-y-4">
        <FormFieldSet type="password" name="password" label="New password" validation={{ rules: { required: true, minLength: 8 } }} />
        <FormFieldSet type="password" name="confirm" label="Confirm password" validation={{ rules: { required: true, matchField: 'password' } }} />
        <Button type="submit" color="primary" fullWidth>
          Update password
        </Button>
      </Form>
    </AuthSplit>
  )
}

export function TwoFactor() {
  const nav = useNavigate()
  return (
    <AuthSplit heading="Two-factor verification" sub="Enter the 6-digit code from your authenticator app.">
      <Form onSubmit={() => nav('/dashboards/ecommerce')} className="space-y-5">
        <OtpField name="code" length={6} />
        <Button type="submit" color="primary" fullWidth>
          Verify
        </Button>
        <p className="text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
          Didn't get a code? <AuthLink to="/auth/two-factor">Resend</AuthLink>
        </p>
      </Form>
    </AuthSplit>
  )
}

export function LockScreen() {
  const nav = useNavigate()
  return (
    <AuthSplit heading="Welcome back, David" sub="Enter your password to unlock the workspace.">
      <div className="mb-5 flex items-center gap-3">
        <Avatar src={avatarUrl(7)} name="David Dev" size="md" showFallback />
        <div>
          <p className="text-[14px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>David Dev</p>
          <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>david@bilkoss.app</p>
        </div>
      </div>
      <Form onSubmit={() => nav('/dashboards/ecommerce')} className="space-y-4">
        <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true } }} />
        <Button type="submit" color="primary" fullWidth>
          Unlock
        </Button>
      </Form>
    </AuthSplit>
  )
}

export function SuccessMail() {
  return (
    <AuthSplit
      heading="Check your inbox"
      sub="We've sent a secure link to your email address. It expires in 30 minutes."
      footer={<AuthLink to="/auth/sign-in">Back to sign in</AuthLink>}
    >
      <div
        className="rounded-lg p-4 text-[13px]"
        style={{ background: 'var(--app-success-soft)', color: 'var(--app-success)' }}
      >
        Email sent successfully. If it doesn't arrive within a few minutes, check your spam folder.
      </div>
      <Button as="a" href="https://mail.google.com" target="_blank" rel="noreferrer" color="primary" fullWidth className="mt-5">
        Open email app
      </Button>
    </AuthSplit>
  )
}

export function LoginPin() {
  const nav = useNavigate()
  return (
    <AuthSplit heading="Enter your PIN" sub="Use the 4-digit PIN linked to this device.">
      <Form onSubmit={() => nav('/dashboards/ecommerce')} className="space-y-5">
        <OtpField name="pin" length={4} ui="single" />
        <Button type="submit" color="primary" fullWidth>
          Continue
        </Button>
      </Form>
    </AuthSplit>
  )
}
