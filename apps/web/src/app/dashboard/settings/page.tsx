import { AccountForm } from "@/components/settings/AccountForm";
import { Separator } from "@repo/ui/components/ui/separator";

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
