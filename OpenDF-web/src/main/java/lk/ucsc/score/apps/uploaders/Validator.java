/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package lk.ucsc.score.apps.uploaders;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class Validator {
 
	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
		+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
        private static Pattern emailPattern = Pattern.compile(EMAIL_PATTERN);
 
	public Validator() { 
	}
 
	/**
	 * Validate hex with regular expression
	 * 
	 * @param hex
	 *            hex for validation
	 * @return true valid hex, false invalid hex
	 */
	public static boolean validateEmail(final String hex) {
		return emailPattern.matcher(hex).matches();
	}
}